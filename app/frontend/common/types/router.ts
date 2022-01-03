// Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

export interface RouteRecordMeta {
  title?: string
  requiresAuth: boolean
  requiredPermission: Maybe<Array<string>>
  hasBottomNavigation?: boolean
  level?: number
}
