export const dynamic = 'force-static';

const assetlinks = [
  {
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: 'dev.johnjoyo.hatian',
      sha256_cert_fingerprints: [
        'D3:0C:E8:6B:A2:66:59:E5:15:94:EE:79:27:88:CE:AC:FB:2F:09:28:80:D7:CB:26:97:2D:9C:8D:E6:D3:3C:CD',
      ],
    },
  },
];

export function GET() {
  return new Response(JSON.stringify(assetlinks), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
