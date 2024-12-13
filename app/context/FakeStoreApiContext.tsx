import { createContext, ReactNode } from 'react'

type FakeStoreApiContextValues = {
  categories: string[]
}

const defaultValues = {
  categories: [],
}

export const FakeStoreApiContext =
  createContext<FakeStoreApiContextValues>(defaultValues)

type FakeStoreApiProviderProps = {
  children: ReactNode
  categories: string[]
}

export function FakeStoreApiProvider({
  children,
  categories,
}: FakeStoreApiProviderProps) {
  return (
    <FakeStoreApiContext.Provider value={{ categories }}>
      {children}
    </FakeStoreApiContext.Provider>
  )
}
