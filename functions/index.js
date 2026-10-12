const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

/**
 * Callable Cloud Function to set custom user roles (admin, editor, sales).
 * Requires caller to have an 'admin' custom claim.
 */
exports.setUserRole = functions.https.onCall(async (data, context) => {
  // 1. Verify caller authentication
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'The function must be called while authenticated.'
    );
  }

  // 2. Verify caller has admin claim
  const callerRole = context.auth.token.role;
  if (callerRole !== 'admin') {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Only users with the admin role can assign custom user roles.'
    );
  }

  const { uid, role } = data;

  // 3. Validate arguments
  if (!uid || typeof uid !== 'string') {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with a valid target "uid".'
    );
  }

  const allowedRoles = ['admin', 'editor', 'sales'];
  if (!role || !allowedRoles.includes(role)) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      `The "role" parameter must be one of: ${allowedRoles.join(', ')}.`
    );
  }

  try {
    // 4. Set custom claims
    await admin.auth().setCustomUserClaims(uid, { role });

    // Also sync role in Firestore users collection
    await admin.firestore().collection('users').doc(uid).set(
      {
        role,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    return { success: true, uid, role };
  } catch (error) {
    console.error('Error setting custom user claim:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

/**
 * Firestore onCreate trigger on leads/{leadId}
 * Sends email notification on new lead submission.
 */
exports.onLeadCreated = functions.firestore
  .document('leads/{leadId}')
  .onCreate(async (snapshot, context) => {
    const leadData = snapshot.data();
    const leadId = context.params.leadId;

    console.log(`[Lead Created Trigger] New lead submitted ID: ${leadId}`);
    console.log(`Name: ${leadData.name || 'N/A'}`);
    console.log(`Phone: ${leadData.phone || 'N/A'}`);
    console.log(`Email: ${leadData.email || 'N/A'}`);
    console.log(`Service Interest: ${leadData.serviceInterest || 'N/A'}`);

    // Placeholder email notification provider hook (SendGrid / Nodemailer)
    const emailPayload = {
      to: 'sales-leads@clientdomain.ae',
      subject: `New Lead: ${leadData.name} - ${leadData.serviceInterest || 'Visa Enquiry'}`,
      text: `New lead received:\nName: ${leadData.name}\nPhone: ${leadData.phone}\nService: ${leadData.serviceInterest}\nNotes: ${leadData.notes || 'None'}`,
    };

    console.log('[Placeholder Email Notification Sent]:', emailPayload);
    return { success: true, leadId };
  });
