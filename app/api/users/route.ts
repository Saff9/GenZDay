import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { auth } from '@/lib/auth';
import { xata } from '@/lib/db';
import { ApiResponse, User } from '@/lib/types';

// GET /api/users - Get current user profile
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(auth);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await xata.db.users
      .filter({ email: session.user.email })
      .getFirst();

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const response: ApiResponse<User> = {
      success: true,
      data: user as any,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// PUT /api/users - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(auth);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { name, phone, image } = await request.json();

    const user = await xata.db.users
      .filter({ email: session.user.email })
      .getFirst();

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const updatedUser = await xata.db.users.update(user.id, {
      name: name || user.name,
      phone: phone || user.phone,
      image: image || user.image,
    });

    const response: ApiResponse<User> = {
      success: true,
      data: updatedUser as any,
      message: 'Profile updated successfully',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    );
  }
}
