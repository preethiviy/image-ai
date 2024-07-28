import { Hono } from "hono";

const app = new Hono().get("/", (c) => {
    return c.json({ user: "Get"});
}).get("/:name", (c) => {
    const params = c.req.param();

    return c.json({ username: params.name})
})

export default app;