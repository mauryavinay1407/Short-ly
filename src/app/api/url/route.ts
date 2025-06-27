import { NextRequest, NextResponse } from 'next/server';
import shortid from 'shortid';
import UrlModel from '@/models/url.model'; // ✅ Renamed to avoid conflict with global URL
import { dbConnect } from '@/dbConfig/dbConfig';
import { auth } from '@clerk/nextjs/server';

// POST /api/url - Create a shortened URL
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const { userId } = auth();
    const shortId = shortid.generate();

    await UrlModel.create({
      shortId,
      redirectURL: url,
      userId: userId || null,
      visitInfo: [],
      clickCount: 0,
    });

    return NextResponse.json({ Id: shortId }, { status: 201 });
  } catch (error) {
    console.error('Error creating short URL:', error);
    return NextResponse.json({ error: 'Failed to create short URL' }, { status: 500 });
  }
}

// GET /api/url?userId=<id> - Fetch URLs for a specific user
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ urls: [] }, { status: 200 });
    }

    const urls = await UrlModel.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json({ urls }, { status: 200 });
  } catch (error) {
    console.error('Error fetching URLs:', error);
    return NextResponse.json({ error: 'Failed to fetch URLs', urls: [] }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url); // ✅ Safe now since model is renamed
    const shortId = searchParams.get('shortId');

    if (!shortId) {
      return NextResponse.json(
        { error: 'Short ID is required' },
        { status: 400 }
      );
    }

    const result = await UrlModel.deleteOne({ shortId });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Short URL not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Short URL deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting short URL:', error);
    return NextResponse.json(
      { error: 'Failed to delete short URL' },
      { status: 500 }
    );
  }
}
