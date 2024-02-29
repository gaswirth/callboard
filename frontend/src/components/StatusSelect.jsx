import React, { useState } from 'react';
import { IconButton, Popover, VStack, ButtonGroup, Button, Text, Box, useDisclosure } from '@chakra-ui/react';
import { attendanceStatus } from '@lib/globals';
import { useUpdateShowAttendance } from '@hooks/mutations/use-update-show-attendance';

function StatusSelect({ status, children, companyMemberId, showId }) {
	const { updateAttendanceMutation, updateAttendanceLoading, updateAttendanceError } = useUpdateShowAttendance();
	const { isOpen, onOpen, onClose } = useDisclosure();

	/**
	 * Fire the mutation to update a company member's status within a show.
	 *
	 * @param {Object} event onClick event.
	 * @param {string} newValue The updated value.
	 */
	const handleIconClick = (event, newValue) => {
		updateAttendanceMutation({ showId, companyMemberId, status: newValue });

		if (!updateAttendanceError && !updateAttendanceLoading) onClose();
	};

	return (
		<>
			<IconButton
				w="40px"
				borderRadius="md"
				cursor="pointer"
				bgColor={children ? 'none' : 'gray.200'}
				p={1}
				onClick={onOpen}
				aria-haspopup="true"
			>
				{children ? children : <Box px={0} py={1.5}></Box>}
			</IconButton>
			<Popover isOpen={isOpen} onClose={onClose} placement="bottom">
				<ButtonGroup
					value={status}
					size="sm"
					onChange={handleIconClick}
					aria-label="Attendance status choices"
					isAttached
				>
					{Object.keys(attendanceStatus).map((status, i) => {
						const button = attendanceStatus[status];
						const Icon = attendanceStatus[status].icon;

						return (
							<Button
								key={i}
								value={status}
								variant="contained"
								textAlign="center"
								borderRadius="none"
								aria-label={button.text}
							>
								<VStack>
									<Icon />
									<Text fontSize="xs" display="block">
										{button.text}
									</Text>
								</VStack>
							</Button>
						);
					})}
				</ButtonGroup>
			</Popover>
		</>
	);
}

export default StatusSelect;
