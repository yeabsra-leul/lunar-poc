
import { NextResponse } from 'next/server';
import { getCompanies } from '@/lib/queries/company';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const skipParam = searchParams.get('skip');
  const skip = skipParam ? parseInt(skipParam, 10) : 0;
  
  const data = await getCompanies(skip); 

  return NextResponse.json(data);
}