export default async (req, context) => {
  console.log(req.body);
  console.log(req);
  console.log(typeof(req.body))
  return new Response(req.body);
};
