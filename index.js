import { unstable_createNodejsStream } from "@vercel/og";
import Fastify from "fastify";
import { createIntlSegmenterPolyfill } from "intl-segmenter-polyfill/dist/bundled.js";

if (!Intl.Segmenter) {
  Intl.Segmenter = await createIntlSegmenterPolyfill();
}

const fastify = Fastify({
  logger: true,
});

fastify.get("/", async function (request, reply) {
  const ogStream = await renderOg();
  return reply.send(ogStream);
});

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});

async function renderOg() {
  const ogStream = await unstable_createNodejsStream(
    {
      type: "div",
      props: {
        children: "haha",
        style: {
          color: "red",
        },
      },
    },
    {
      width: 1200,
      height: 600,
    }
  );

  return ogStream;
}
