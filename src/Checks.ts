import { ponder } from "@/generated";

ponder.on("Checks:Approval", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("Checks:ApprovalForAll", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("Checks:Composite", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("Checks:Infinity", async ({ event, context }) => {
  console.log(event.args);
});
