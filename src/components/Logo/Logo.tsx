import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="TNUEF Logo"
      width={64}
      height={64}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[4rem] w-full h-[64px]', className)}
      src="/logo.png"
    />
  )
}
