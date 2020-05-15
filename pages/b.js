import React from "react";
import { withLayout } from "../src/layout/Layout";
import Link from "next/link";

function b() {
  return (
    <div>
      b sayfası
      <Link href="/a">
        <a>a sayfasın git</a>
      </Link>
    </div>
  );
}

export default withLayout(b);
