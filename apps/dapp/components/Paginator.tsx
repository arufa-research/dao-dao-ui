// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import Link from 'next/link'

import { Button } from '@dao-dao/ui'

function Paginator({
  page,
  limit,
  count,
}: {
  page: number
  limit: number
  count: number
}) {
  const total = Math.ceil(count / limit)

  return (
    <div className="flex gap-2 items-center">
      {Array.from(Array(total), (_, i) => (
        <Link legacyBehavior key={i + 1} href={`?page=${i + 1}&limit=${limit}`} passHref>
          <Button className={`${page - 1 === i ? 'ring' : ''}`} size="sm">
            {i + 1}
          </Button>
        </Link>
      ))}
    </div>
  )
}

export default Paginator
