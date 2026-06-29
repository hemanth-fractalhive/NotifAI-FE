import { NavLink, useLocation } from 'react-router-dom'
import { LayoutDashboard, Settings, Users, FileText, PanelLeft } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/ui/tooltip/tooltip'
import logo from '../../assets/FractalHive_Logo.svg'

/**
 * navItems — add your app's routes here.
 * Each item needs: to (path), label, icon (LucideIcon), exact (true for root).
 */
const navItems: Array<{
  to: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  exact: boolean
}> = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/users', label: 'Users', icon: Users, exact: false },
  { to: '/documents', label: 'Documents', icon: FileText, exact: false },
  { to: '/settings', label: 'Settings', icon: Settings, exact: false },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation()

  return (
    <aside
      className={cn(
        'bg-navbar flex h-full flex-shrink-0 flex-col transition-all duration-200',
        collapsed ? 'w-14 items-center' : 'w-56',
      )}
    >
      {/* Logo row */}
      <div
        className={cn(
          'flex h-14 flex-shrink-0 items-center',
          collapsed ? 'justify-center' : 'gap-2.5 px-4',
        )}
      >
        {collapsed ? (
          <div
            className="group relative flex h-8 w-8 flex-shrink-0 cursor-pointer items-center justify-center rounded-lg"
            onClick={onToggle}
          >
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-10 transition-opacity duration-150 group-hover:opacity-0"
            />
            <PanelLeft className="text-foreground/60 absolute h-4 w-4 rotate-180 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
          </div>
        ) : (
          <>
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
              <img src={logo} alt="Logo" className="h-10 w-10" />
            </div>
            <span className="text-navbar-foreground truncate text-sm font-semibold">App Name</span>
          </>
        )}
      </div>

      {/* Nav items */}
      <nav
        className={cn(
          'flex flex-1 flex-col py-2',
          collapsed ? 'items-center gap-0.5 px-0' : 'gap-0.5 px-2',
        )}
      >
        {navItems.map(({ to, label, icon: Icon, exact }) => {
          const isActive = exact ? location.pathname === to : location.pathname.startsWith(to)
          const linkEl = (
            <NavLink
              to={to}
              className={cn(
                'flex items-center gap-3 rounded-lg text-sm font-medium transition-colors',
                collapsed ? 'h-10 w-10 justify-center' : 'w-full px-3 py-2',
                isActive
                  ? 'bg-background text-foreground font-semibold shadow-sm'
                  : 'text-foreground/70 hover:bg-navbar-border hover:text-foreground',
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          )

          if (collapsed) {
            return (
              <Tooltip key={to} delayDuration={0}>
                <TooltipTrigger asChild>{linkEl}</TooltipTrigger>
                <TooltipContent side="right" className="text-xs">
                  {label}
                </TooltipContent>
              </Tooltip>
            )
          }
          return <div key={to}>{linkEl}</div>
        })}
      </nav>
    </aside>
  )
}
