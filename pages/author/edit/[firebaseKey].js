import { useRouter } from 'next/router';

export default function EditAuthor() {
  const router = useRouter();
  const { firebaseKey } = router.query;

  return <div>New Author Here {firebaseKey}</div>;
}
