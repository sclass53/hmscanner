export default async (req, context) => {
  console.log(req.body);
  console.log(req);
  console.log(typeof(req.body))
  return new Response(typeof(req.body));
};
