const {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} = require('@firebase/rules-unit-testing');
const fs = require('fs');
const { doc, setDoc, getDoc } = require('firebase/firestore');

let testEnv;

async function runTests() {
  console.log("Initializing test environment...");
  testEnv = await initializeTestEnvironment({
    projectId: 'demo-uae-consultant',
    firestore: {
      rules: fs.readFileSync('firestore.rules', 'utf8'),
      host: '127.0.0.1',
      port: 8080
    },
  });

  let allPassed = true;

  try {
    // 1. Unauthenticated client CAN create a lead
    const unauthedDb = testEnv.unauthenticatedContext().firestore();
    console.log("Test 1: Unauthenticated lead creation...");
    await assertSucceeds(
      setDoc(doc(unauthedDb, 'leads', 'test-lead-1'), {
        name: 'Test Name',
        phone: '123',
        serviceInterest: 'Visa',
      })
    );
    console.log("PASS: Unauthenticated lead creation succeeded.");
  } catch (e) {
    console.error("FAIL: Unauthenticated lead creation failed.", e);
    allPassed = false;
  }

  try {
    // 2. Unauthenticated client CANNOT read leads
    const unauthedDb = testEnv.unauthenticatedContext().firestore();
    console.log("Test 2: Unauthenticated lead read...");
    await assertFails(
      getDoc(doc(unauthedDb, 'leads', 'test-lead-1'))
    );
    console.log("PASS: Unauthenticated lead read failed as expected.");
  } catch (e) {
    console.error("FAIL: Unauthenticated lead read did not fail.", e);
    allPassed = false;
  }

  try {
    // 3. Authenticated (no role) CANNOT write to services
    console.log("Test 3: Authenticated (no role) write to services...");
    const authedDb = testEnv.authenticatedContext('user123', {}).firestore();
    await assertFails(
      setDoc(doc(authedDb, 'services', 'test-svc'), { title: 'Test' })
    );
    console.log("PASS: Authenticated user write to services failed as expected.");
  } catch (e) {
    console.error("FAIL: Authenticated user write to services did not fail.", e);
    allPassed = false;
  }

  try {
    // 4. Admin CAN write to services
    console.log("Test 4: Admin write to services...");
    const adminDb = testEnv.authenticatedContext('admin123', { role: 'admin' }).firestore();
    await assertSucceeds(
      setDoc(doc(adminDb, 'services', 'test-svc'), { title: 'Test' })
    );
    console.log("PASS: Admin write to services succeeded.");
  } catch (e) {
    console.error("FAIL: Admin write to services failed.", e);
    allPassed = false;
  }

  if (allPassed) {
    console.log("\nAll tests completed successfully.");
    process.exit(0);
  } else {
    console.error("\nSome tests failed.");
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error("Test framework failed:", e);
  process.exit(1);
});
