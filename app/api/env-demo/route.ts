export async function GET() {
  return Response.json({
    publicSiteName: process.env.NEXT_PUBLIC_SITE_NAME,
    privateDemoSecret: process.env.PRIVATE_DEMO_SECRET,
  });
}
