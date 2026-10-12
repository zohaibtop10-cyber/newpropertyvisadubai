"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onLeadCreated = exports.setUserRole = void 0;
const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
admin.initializeApp();
exports.setUserRole = functions.https.onCall(async (data, context) => {
    if (!context.auth || context.auth.token.role !== 'admin') {
        throw new functions.https.HttpsError('permission-denied', 'Only admins can assign roles.');
    }
    const { uid, role } = data;
    if (!['admin', 'editor', 'sales'].includes(role)) {
        throw new functions.https.HttpsError('invalid-argument', 'Role must be admin, editor, or sales.');
    }
    try {
        await admin.auth().setCustomUserClaims(uid, { role });
        return { success: true, message: `Role ${role} assigned to user ${uid}` };
    }
    catch (error) {
        throw new functions.https.HttpsError('internal', 'Error setting custom claims.');
    }
});
exports.onLeadCreated = functions.firestore
    .document('leads/{leadId}')
    .onCreate((snap, context) => {
    const lead = snap.data();
    console.log(`[PLACEHOLDER] Sending email to sales for new lead: ${lead.name}, Phone: ${lead.phone}, Interest: ${lead.serviceInterest}`);
    return null;
});
//# sourceMappingURL=index.js.map