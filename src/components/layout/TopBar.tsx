import { PanelLeft, LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar/avatar'

interface TopBarProps {
  collapsed: boolean
  onToggle: () => void
}

export function TopBar({ collapsed, onToggle }: TopBarProps) {
  const handleLogout = () => {
    // Replace with your auth logout logic
    console.log('Logout')
  }

  return (
    <header className="bg-navbar flex h-14 flex-shrink-0 items-center justify-between px-4">
      {!collapsed && (
        <button
          onClick={onToggle}
          className="text-foreground/60 hover:bg-navbar-border hover:text-foreground flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          <PanelLeft className="h-4 w-4" />
        </button>
      )}

      <div className="ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="rounded-full transition-opacity hover:opacity-80 focus:outline-none"
              aria-label="User menu"
            >
              <Avatar>
                <AvatarImage src="" alt="User avatar" />
                <AvatarFallback className="text-xs font-medium">JD</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="font-normal">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-muted-foreground text-xs">john@example.com</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
