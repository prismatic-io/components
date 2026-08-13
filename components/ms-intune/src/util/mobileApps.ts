export const getMobileAppObject = (
  intent: string,
  target: string,
  settings: string,
  groupId?: string,
) => ({
  intent,
  target: {
    "@odata.type": target,
  },
  settings: {
    "@odata.type": settings,
    useDeviceContext: true,
  },
  id: groupId,
});
