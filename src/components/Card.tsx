import Link from "next/link";

function Card() {
  return (
    <Link href="/orderdetail">
      <div className="rounded-xl bg-white shadow-sm"></div>
    </Link>
  );
}
export default Card;
