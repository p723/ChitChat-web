import React from "react";
import ChatsTab from "../../screens/Tabs/ChatsTab/ChatsTab";
import StatusTab from "../../screens/Tabs/StatusTab/StatusTab";
import CallsTab from "../../screens/Tabs/CallsTab/CallsTab";
import { useSelector } from "react-redux";

const HomeTabs = () => {
  const { activeTab } = useSelector((state) => state.tab);
  return (
    <div className="w-full h-screen bg-white dark:bg-gray-600">
   
   {
   activeTab === 0 ? "cameratab" : activeTab === 1 ? <ChatsTab /> : activeTab === 2 ? <StatusTab /> : activeTab === 3 ?  <CallsTab /> : null
}
    </div>
  );
};

export default HomeTabs;
