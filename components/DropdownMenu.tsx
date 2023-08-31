import { Menu, LineChart, Newspaper, Sun, Moon, Settings } from "lucide-react";

import { useTheme } from "next-themes";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu as DropdownMenuShadcn,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropdownMenu() {
  const { setTheme } = useTheme();
  const router = useRouter();

  return (
    <DropdownMenuShadcn>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-none">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/")}>
            <LineChart className="mr-2 h-4 w-4" />
            <span>Stocks</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/news")}>
            <Newspaper className="mr-2 h-4 w-4" />
            <span>Top 100 News</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenuShadcn>
  );
}
