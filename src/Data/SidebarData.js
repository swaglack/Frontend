import MessageIcon from "@material-ui/icons/Message";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkRoderIcon from "@material-ui/icons/BookmarkBorder";
import PoepleIcon from "@material-ui/icons/People";
import AppIcon from "@material-ui/icons/Apps";

export const sidebarItems = [
  {
    id: 1,
    icon: <MessageIcon />,
    text: "Thread",
  },
  {
    id: 2,
    icon: <InboxIcon />,
    text: "All DMs",
  },
  {
    id: 3,
    icon: <DraftsIcon />,
    text: "Mentions & Reactions",
  },
  {
    id: 4,
    icon: <BookmarkRoderIcon />,
    text: "Save Items",
  },
  {
    id: 5,
    icon: <PoepleIcon />,
    text: "Peoples & Groups",
  },
  {
    id: 6,
    icon: <AppIcon />,
    text: "More",
  },
];
