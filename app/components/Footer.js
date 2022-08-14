import { Container, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="pt-10 pb-10">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <>
              <Grid
                container
                direction="row"
                justifyContent="left"
                alignItems="center"
              >
                <Grid item>
                  <Link passHref href="/">
                    <div className="cursor-pointer mt-2">
                      <Image
                        src="/favicon.ico"
                        width={34}
                        height={34}
                        alt="icon"
                      />
                    </div>
                  </Link>
                </Grid>
                <Grid item>
                  <Link passHref href="/">
                    <span className="ml-3 cursor-pointer text-3xl font-bold">next-mui</span>
                  </Link>
                </Grid>
              </Grid>
              <span className="text-grey text-sm">
                next-muiためのコミュニティ
              </span>
            </>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <h3 className="font-bold text-xl mb-1">About</h3>
            <ul className="m-0 p-0 list-none text-grey text-sm leading-8">
              <li>
                <Link passHref href="/">
                  <span className="cursor-pointer hover:underline underline-offset-4">next-muiについて</span>
                </Link>
              </li>
              <li>
                <Link passHref href="/">
                  <span className="cursor-pointer hover:underline underline-offset-4">よくある質問</span>
                </Link>
              </li>
              <li>
                <Link passHref href="/">
                  <span className="cursor-pointer hover:underline underline-offset-4">運営</span>
                </Link>
              </li>
              <li>
                <Link passHref href="/">
                  <span className="cursor-pointer hover:underline underline-offset-4">開発ロードマップ</span>
                </Link>
              </li>
              <li>
                <Link passHref href="/">
                  <span className="cursor-pointer hover:underline underline-offset-4">チェンジログ</span>
                </Link>
              </li>
              <li>
                <Link passHref href="/">
                  <span className="cursor-pointer hover:underline underline-offset-4">使い方</span>
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <h3 className="font-bold text-xl mb-1">Legal</h3>
            <ul className="m-0 p-0 list-none text-grey text-sm leading-8">
              <li>
                <Link passHref href="/">
                  <span className="cursor-pointer hover:underline underline-offset-4">利用規約</span>
                </Link>
              </li>
              <li>
                <Link passHref href="/">
                  <span className="cursor-pointer hover:underline underline-offset-4">プライバシーポリシー</span>
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

