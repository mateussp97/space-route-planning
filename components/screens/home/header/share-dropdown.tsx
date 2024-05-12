import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { URL } from "@/utils/constants";

import { Facebook, Linkedin, Mail, Share, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

export default function ShareDropdown() {
  const t = useTranslations("home");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-sm hidden sm:flex"
        >
          <Share className="size-3.5" />
          {t("share")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-fit flex flex-col items-start"
      >
        <FacebookShareButton url={URL} className="w-full h-fit">
          <DropdownMenuItem className="w-full flex items-center gap-1.5 cursor-pointer">
            <Facebook className="size-3.5" />
            Facebook
          </DropdownMenuItem>
        </FacebookShareButton>

        <LinkedinShareButton url={URL} className="w-full h-fit">
          <DropdownMenuItem className="w-full flex items-center gap-1.5 cursor-pointer">
            <Linkedin className="size-3.5" />
            LinkedIn
          </DropdownMenuItem>
        </LinkedinShareButton>

        <TwitterShareButton url={URL} className="w-full h-fit">
          <DropdownMenuItem className="w-full flex items-center gap-1.5 cursor-pointer">
            <Twitter className="size-3.5" />
            Twitter
          </DropdownMenuItem>
        </TwitterShareButton>

        <EmailShareButton url={URL} className="w-full h-fit">
          <DropdownMenuItem className="w-full flex items-center gap-1.5 cursor-pointer">
            <Mail className="size-3.5" />
            Email
          </DropdownMenuItem>
        </EmailShareButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
