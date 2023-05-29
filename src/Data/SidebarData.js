import MessageIcon from "@material-ui/icons/Message";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkRoderIcon from "@material-ui/icons/BookmarkBorder";
import PoepleIcon from "@material-ui/icons/People";
import AppIcon from "@material-ui/icons/Apps";

export const sidebarItems = [
  {
    icon: <MessageIcon />,
    text: "Thread",
  },
  {
    icon: <InboxIcon />,
    text: "All DMs",
  },
  {
    icon: <DraftsIcon />,
    text: "Mentions & Reactions",
  },
  {
    icon: <BookmarkRoderIcon />,
    text: "Save Items",
  },
  {
    icon: <PoepleIcon />,
    text: "Peoples & Groups",
  },
  {
    icon: <AppIcon />,
    text: "More",
  },
];
