import { useRouter } from "next/router";

export default function IssuePage() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  return <>HERE</>;
}
