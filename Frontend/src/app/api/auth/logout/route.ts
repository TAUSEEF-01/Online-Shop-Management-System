import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const response = await fetch('http://localhost:5000/auth/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Logout failed on server');
    }

    // Clear cookies
    (await cookies()).delete('sessionId');
    
    return new NextResponse(JSON.stringify({ message: 'Logged out successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        // Clear the cookie on the client side as well
        'Set-Cookie': 'sessionId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly'
      },
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to logout' },
      { status: 500 }
    );
  }
}
