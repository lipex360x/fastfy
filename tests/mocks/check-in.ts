interface CreateCheckInProps {
  gymId: string
  userId: string
}

export const makeCheckIn = (props?: Partial<CreateCheckInProps>) => ({
  gym_id: props?.gymId ?? 'gym-id',
  user_id: props?.userId ?? 'user-id',
})
