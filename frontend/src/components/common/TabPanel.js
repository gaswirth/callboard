import React from 'react';

export default function TabPanel({ currentTab, id, children }) {
	return currentTab === id ? <div>{children}</div> : null;
}
