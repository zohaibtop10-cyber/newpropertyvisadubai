import { describe, it, beforeAll, afterAll, beforeEach, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import {
  initializeTestEnvironment,
  RulesTestEnvironment,
  assertSucceeds,
  assertFails,
} from '@firebase/rules-unit-testing';

const PROJECT_ID = 'propertyvisadubai-web-test';
let testEnv: RulesTestEnvironment;

describe('Firestore Security Rules Unit Tests', () => {
  beforeAll(async () => {
    const rulesPath = resolve(__dirname, '../firestore.rules');
    const rules = readFileSync(rulesPath, 'utf8');

    testEnv = await initializeTestEnvironment({
      projectId: PROJECT_ID,
      firestore: {
        rules,
        host: '127.0.0.1',
        port: 8080,
      },
    });
  });

  afterAll(async () => {
    if (testEnv) {
      await testEnv.cleanup();
    }
  });

  beforeEach(async () => {
    await testEnv.clearFirestore();
  });

  it('ALLOWS unauthenticated client to CREATE a lead', async () => {
    const unauthDb = testEnv.unauthenticatedContext().firestore();
    const leadRef = unauthDb.collection('leads').doc('lead-1');

    await assertSucceeds(
      leadRef.set({
        name: 'John Doe',
        phone: '+971500000000',
        serviceInterest: 'Property Visa',
        status: 'New',
      })
    );
  });

  it('DENIES unauthenticated client from READING the leads collection', async () => {
    const unauthDb = testEnv.unauthenticatedContext().firestore();
    const leadRef = unauthDb.collection('leads').doc('lead-1');

    await assertFails(leadRef.get());
  });

  it('DENIES authenticated user WITH NO ROLE CLAIM from writing to services', async () => {
    const noRoleDb = testEnv
      .authenticatedContext('user-123', { email: 'user@example.com' })
      .firestore();
    const serviceRef = noRoleDb.collection('services').doc('property-visa');

    await assertFails(
      serviceRef.set({
        title: 'Unauthorized Edit',
        startingFee: 1000,
      })
    );
  });

  it('ALLOWS user WITH ADMIN CLAIM to write to services', async () => {
    const adminDb = testEnv
      .authenticatedContext('admin-999', {
        email: 'admin@clientdomain.ae',
        role: 'admin',
      })
      .firestore();
    const serviceRef = adminDb.collection('services').doc('property-visa');

    await assertSucceeds(
      serviceRef.set({
        title: 'Golden Visa 10-Year',
        startingFee: 11000,
        status: 'active',
      })
    );
  });

  it('ALLOWS staff (sales role) to READ leads', async () => {
    const salesDb = testEnv
      .authenticatedContext('sales-101', {
        email: 'sales@clientdomain.ae',
        role: 'sales',
      })
      .firestore();
    const leadRef = salesDb.collection('leads').doc('lead-1');

    await assertSucceeds(leadRef.get());
  });
});
