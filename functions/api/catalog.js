export async function onRequestGet(context) {
    const { env } = context;

    const listed = await env.JIBONFLIX_BUCKET.list();

    return new Response(JSON.stringify({
        success: true,
        objects: listed.objects.map(object => ({
            key: object.key,
            size: object.size,
            uploaded: object.uploaded
        }))
    }), {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store"
        }
    });
}
