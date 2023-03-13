import { unstable_createNodejsStream } from '@vercel/og';
import { createServer } from 'node:http';
import { pipeline } from 'node:stream';
import { createIntlSegmenterPolyfill } from 'intl-segmenter-polyfill';

Intl.Segmenter = await createIntlSegmenterPolyfill();

async function renderOg() {
  const ogStream = await unstable_createNodejsStream(
    {
      type: 'div',
      props: {
        children: 'haha',
        styles: {
          color: 'red',
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

const ogServer = createServer(async (_req, res) => {
  const ogStream = await renderOg();
  pipeline(ogStream, res);
  res.writeHead(200);
});

ogServer.listen(3000);
console.log('og at 3000');
