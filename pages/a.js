import React from "react";
import { withLayout } from "../src/layout/Layout";
import Link from "next/link";

function a() {
  return (
    <div>
      a sayfası
      <Link href="/b">
        <a>b sayfasına git</a>
      </Link>
    </div>
  );
}

export default withLayout(a);
