import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Create and export the route handlers
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
