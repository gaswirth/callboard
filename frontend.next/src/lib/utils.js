import React from 'react';

/**
 * Extrapolates castMemberIds from queried `showData.attendance` object.
 *
 * @param {Object} attendance
 * @returns {Array} The extrapolated castMemberIds.
 */
export function showAttendedBy(attendance) {
  var castIds = [];

  for (const castMember in attendance) {
    castIds.push(attendance[castMember].castMember.castMemberId);
  }

  return castIds;
}

export const decodeHtml = (rawHTML) => React.createElement('div', { dangerouslySetInnerHTML: { __html: rawHTML } });
