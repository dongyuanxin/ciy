const tcb = require("@cloudbase/node-sdk");

exports.main = async (event, context) => {
  console.log(">>> tcb context are:", tcb.getCloudbaseContext());
  return event;
};
