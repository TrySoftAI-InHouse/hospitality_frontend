import { Bot, Zap, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export function Header() {
  return (
    <header className="bg-white border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* AI Platform Logo/Branding */}
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg">AI Platform</h1>
              <p className="text-xs text-muted-foreground">
                Visual Modular Workflow Designer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="outline" className="gap-1">
              <Zap className="w-3 h-3" />
              Phase 1
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}