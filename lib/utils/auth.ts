import { supabase } from '../supabase'

/**
 * Sign up with email and password
 */
export const signUpWithEmail = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) throw authError

    if (!authData.user) throw new Error('User creation failed')

    // Create user profile
    const { error: profileError } = await supabase.from('users').insert([
      {
        id: authData.user.id,
        email,
        username,
        wallet_balance: 0,
        is_admin: false,
      },
    ])

    if (profileError) throw profileError

    return { success: true, user: authData.user }
  } catch (error) {
    return { success: false, error }
  }
}

/**
 * Login with email and password
 */
export const loginWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return { success: true, session: data.session }
  } catch (error) {
    return { success: false, error }
  }
}

/**
 * Login with username
 */
export const loginWithUsername = async (username: string, password: string) => {
  try {
    // First find user by username to get email
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('email')
      .eq('username', username)
      .single()

    if (userError) throw new Error('User not found')

    if (!userData) throw new Error('User not found')

    // Then login with email and password
    const result = await loginWithEmail(userData.email, password)

    return result
  } catch (error) {
    return { success: false, error }
  }
}

/**
 * Logout
 */
export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

/**
 * Get current session
 */
export const getCurrentSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return { success: true, session: data.session }
  } catch (error) {
    return { success: false, error }
  }
}

/**
 * Get current user
 */
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser()
    if (error) throw error
    return { success: true, user: data.user }
  } catch (error) {
    return { success: false, error }
  }
}

/**
 * Get user profile
 */
export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return { success: true, user: data }
  } catch (error) {
    return { success: false, error }
  }
}

/**
 * Update user profile
 */
export const updateUserProfile = async (userId: string, updates: any) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return { success: true, user: data }
  } catch (error) {
    return { success: false, error }
  }
}
