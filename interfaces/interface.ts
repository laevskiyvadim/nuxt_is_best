export interface AuthState {
  logout(): Promise<void>
  sendFormLogin(credentials: { login: string; password: string }): Promise<void>
  sendFormRegistration(credentials: { login: string; password: string }): void
}

export type Role = {
  readonly id: number
  readonly name: string
}

export type User = {
  readonly id?: number
  readonly login: string
  password?: string
  role?: Role
}

export type UserAndRoles = {
  users?: User[]
  roles?: Role[]
}
export type City = {
  id: number
  name: string
}

export type Good = {
  readonly id: number
  name: string
  content: string
  cityOfDeparture: City
  dateOfDeparture: string
  cityOfArrival: City
  dateOfArrival: string
  user?: User
  [key: string]: any
}

export type GoodAndCities = {
  goods: Good[]
  cities: City[]
  role: string
}

export interface GoodsState {
  readonly data: GoodAndCities
  readonly getGoods: Good[]
  readonly getCities: City[]
  readonly currentGood: Partial<Good>
  selectedGood: Partial<Good>
  setData(data: GoodAndCities): void
  setSelectedGood(id: number): void
  addSelectGood(good: Good): void
  removeSelectedGood(): void
  fetchGoods(): Promise<void>
  updateGood(good: Good): Promise<void>
  deleteGood(id: number): Promise<void>
}
