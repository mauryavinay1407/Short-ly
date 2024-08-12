import { NextRequest, NextResponse } from 'next/server';
import shortid from 'shortid';
import URL from '@/models/url.model';
import {dbConnect} from "@/dbConfig/dbConfig"

dbConnect();

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json(
      { error: 'Url is required' },
      { status: 401 }
    );
  }

  const shortId = shortid.generate();

  await URL.create({
    shortId,
    redirectURL: url,
    visitInfo: [],
  });

  return NextResponse.json(
    { Id: shortId },
    { status: 201 }
  );
}

