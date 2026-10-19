
import { useCallback, useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'
import './Admin.css'

const BUCKET = 'lavash-photos'
const MAX_FILE_SIZE = 5 * 1024 * 1024

type CafePhoto = {
  name: string
  url: string
  createdAt: string
}

type PhotoAssignment = {
  id: string
  category_name: string
  item_name: string
  storage_path: string
  created_by: string
}

const MENU: Record<string, string[]> = {
  Breakfast: [
    'House Breakfast',
    'French Toast',
    'Goat Liver',
    '2 Fried Eggs',
    'A Bowl of Oats',
    'Anjera Somali (X2)',
    'Pancakes with Honey (X2)',
    'Fluffy Pancakes (X2)',
    'Waffle',
  ],
  Omelettes: [
    'Plain Omelette',
    'Rolex Chapati',
    'Spanish Omelette',
  ],
  'Snacks & Quick Bites': [
    'Beef Samosas (X2)',
    'Chicken Samosas (X2)',
    'Potato Wedges',
    'Sausages (X2)',
    'Mandazi',
    'Chapati',
    'Pancakes (X2)',
    'Chicken Pie',
    'Meat Pie',
  ],
  Soups: [
    'Cream of Chicken',
    'Vegetable Soup',
    'Aleso Soup',
  ],
  'Main Dishes': [
    'Chicken Biriyani',
    'Beef Biriyani',
    'Pilau',
    'Injera Ethiopia',
    'Rice With Sauce',
    'Spaghetti',
    'Pasta Saldato',
    'KK Saldato',
    'Aleso',
    'Kostato',
    'Arosto',
    'Suqaar',
  ],
  'Somali Dishes': [
    'Aleso',
    'Arosto',
    'Daylo',
    'K.K',
    'K.K Saldato',
    'Pasta Saldato',
    'Pilau Beef',
    'Suquaar',
  ],
  'Swahili Plates': [
    'Chicken Biryani',
    'Goat Biryani',
    'Beef Biryani',
    'Pilau',
    'Zanzibari Chicken or Fish',
    'Coconut Chicken or Fish',
  ],
  'Indian Tastes': [
    'Fish Curry',
    'Chicken Curry',
    'Chicken or Fish in Butter Sauce',
    'Beef Curry',
  ],
  Burgers: [
    'Beef Burger',
    'Vegetable Burger',
    'Chicken Burger',
    'Extra Cheese',
  ],
  Sandwiches: [
    'Chicken Sandwich',
    'Beef Sandwich',
    'Veggie Sandwich',
    'Club Sandwich Beef',
    'Club Sandwich Chicken',
    'Wrap Sandwich Eggs',
    'Chicken Wrap',
    'Mexican Sandwich Beef',
    'Mexican Sandwich Chicken',
    'Extra Cheese',
  ],
  Salads: [
    'Tuna Salad',
    'Garden Salad',
    'Chicken Salad',
    'Culler Salad',
    'Fruit Salad',
  ],
  "Kids' Corner": [
    'Chicken Nuggets with Chips',
    'Kiddies Fish Fingers with Chips',
    'Chips with Sausage',
  ],
  'Fries & Sides': [
    'Chips',
    'Chips Masala',
    'Potato Wedges',
    'Wedges & Toast',
    'Chapati / Toast',
  ],
  'Stir-Fry Dishes': [
    'Chicken Stir-Fry',
    'Beef Stir-Fry',
    'Fish Stir-Fry',
  ],
  'Steaks & Specialties': [
    'Steak in Pepper Sauce',
    'Sweet & Sour Chicken',
  ],
  Juices: [
    'Mango Juice',
    'Orange Juice',
    'Passion Juice',
    'Lemonade',
    'Mixberry Juice',
    'Lemon Mint Juice',
    'Mint Pineade',
    'Pineapple Juice',
    'Cocktail Juice',
  ],
  'Hot Drinks': [
    'House Coffee',
    'Espresso',
    'Americano',
    'Macchiato',
    'Cappuccino',
    'Mocha',
    'Café Latte',
    'Chai Latte',
    'Camel Coffee (Milk)',
    'Camel Tea (Milk)',
    'Latte Macchiato',
    'Hot Chocolate',
    'Kenyan Tea',
    'Lemon Tea',
    'Herbal Infusion Dawa',
    'Moroccan Minty',
    'Black Tea',
    'Fresh Camel Milk',
  ],
  'Other Drinks': [
    'Mineral Water (500 ml)',
    'Mineral Water (1 L)',
    'Dasani (500 ml)',
    'Keringet (500 ml)',
    'Sparkling Water (500 ml)',
    'Sodas',
  ],
  Milkshakes: [
    'Chocolate Milkshake',
    'Vanilla Milkshake',
    'Strawberry Milkshake',
    'Banana Milkshake',
    'Espresso Milkshake',
    'Mocha Milkshake',
    'Caramel Milkshake',
    'Mango Milkshake',
  ],
  'Ice Cream': [
    'Ice Cream — 1 Scoop',
    'Ice Cream — 2 Scoops',
  ],
}

export default function Admin() {
  const [user, setUser] = useState<User | null>(null)
  const [checkingSession, setCheckingSession] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [photos, setPhotos] = useState<CafePhoto[]>([])
  const [assignments, setAssignments] = useState<PhotoAssignment[]>([])
  const [loadingPhotos, setLoadingPhotos] = useState(false)
  const [loadingAssignments, setLoadingAssignments] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [savingAssignment, setSavingAssignment] = useState(false)
  const [deletingPhoto, setDeletingPhoto] = useState<string | null>(null)

  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(MENU)[0],
  )
  const [selectedDish, setSelectedDish] = useState(
    MENU[Object.keys(MENU)[0]][0],
  )
  const [selectedPhoto, setSelectedPhoto] = useState('')

  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const currentAssignment = assignments.find(
    (assignment) =>
      assignment.category_name === selectedCategory &&
      assignment.item_name === selectedDish,
  )

  const currentPhoto = photos.find(
    (photo) => photo.name === currentAssignment?.storage_path,
  )

  useEffect(() => {
    let mounted = true

    async function checkSession() {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (!mounted) return

        if (error) setErrorMessage(error.message)

        setUser(data.session?.user ?? null)
      } catch {
        if (mounted) {
          setErrorMessage('Unable to check your session. Please refresh.')
        }
      } finally {
        if (mounted) setCheckingSession(false)
      }
    }

    void checkSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const loadPhotos = useCallback(async () => {
    setLoadingPhotos(true)

    try {
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .list('', {
          limit: 100,
          sortBy: { column: 'created_at', order: 'desc' },
        })

      if (error) throw error

      const photoFiles = (data ?? []).filter(
        (file) =>
          file.name &&
          file.name !== '.emptyFolderPlaceholder' &&
          file.metadata,
      )

      setPhotos(
        photoFiles.map((file) => {
          const { data: publicData } = supabase.storage
            .from(BUCKET)
            .getPublicUrl(file.name)

          return {
            name: file.name,
            url: publicData.publicUrl,
            createdAt: file.created_at ?? '',
          }
        }),
      )
    } catch (error) {
      setErrorMessage(
        `Could not load photos: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      )
    } finally {
      setLoadingPhotos(false)
    }
  }, [])

  const loadAssignments = useCallback(async () => {
    setLoadingAssignments(true)

    try {
      const { data, error } = await supabase
        .from('menu_item_photos')
        .select('*')
        .order('category_name')
        .order('item_name')

      if (error) throw error

      setAssignments((data ?? []) as PhotoAssignment[])
    } catch (error) {
      setErrorMessage(
        `Could not load dish assignments: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      )
    } finally {
      setLoadingAssignments(false)
    }
  }, [])

  useEffect(() => {
    if (user) {
      void loadPhotos()
      void loadAssignments()
    } else {
      setPhotos([])
      setAssignments([])
    }
  }, [user, loadPhotos, loadAssignments])

  useEffect(() => {
    const existing = assignments.find(
      (assignment) =>
        assignment.category_name === selectedCategory &&
        assignment.item_name === selectedDish,
    )

    setSelectedPhoto(existing?.storage_path ?? '')
  }, [assignments, selectedCategory, selectedDish])

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')
    setErrorMessage('')

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (error) throw error

      setPassword('')
      setMessage('You are signed in.')
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Unable to sign in.',
      )
    }
  }

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget
    const files = Array.from(input.files ?? [])

    if (!files.length) return

    setMessage('')
    setErrorMessage('')

    const invalidFile = files.find(
      (file) =>
        !file.type.startsWith('image/') ||
        file.size > MAX_FILE_SIZE,
    )

    if (invalidFile) {
      setErrorMessage(
        `${invalidFile.name}: choose an image no larger than 5 MB.`,
      )
      input.value = ''
      return
    }

    setUploading(true)
    let uploadedCount = 0
    let failedFile = ''

    try {
      for (const file of files) {
        const safeName = file.name
          .normalize('NFKD')
          .replace(/[^a-zA-Z0-9._-]/g, '-')

        const filePath = `${crypto.randomUUID()}-${safeName}`

        const { error } = await supabase.storage
          .from(BUCKET)
          .upload(filePath, file, {
            contentType: file.type,
            cacheControl: '3600',
            upsert: false,
          })

        if (error) {
          failedFile = file.name
          throw error
        }

        uploadedCount++
      }

      setMessage(
        `${uploadedCount} photo${uploadedCount === 1 ? '' : 's'} uploaded successfully. You can now assign a photo to a dish below.`,
      )
    } catch (error) {
      setErrorMessage(
        `Upload${failedFile ? ` failed for ${failedFile}` : ' failed'}: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      )
    } finally {
      setUploading(false)
      input.value = ''

      if (uploadedCount > 0) await loadPhotos()
    }
  }

  async function handleAssignPhoto() {
    if (!user) {
      setErrorMessage('Please sign in before assigning a photo.')
      return
    }

    if (!selectedPhoto) {
      setErrorMessage('Choose a photo from your library first.')
      return
    }

    setMessage('')
    setErrorMessage('')
    setSavingAssignment(true)

    try {
      const { error } = await supabase
        .from('menu_item_photos')
        .upsert(
          {
            category_name: selectedCategory,
            item_name: selectedDish,
            storage_path: selectedPhoto,
            created_by: currentAssignment?.created_by ?? user.id,
          },
          { onConflict: 'category_name,item_name' },
        )

      if (error) throw error

      setMessage(
        `Photo assigned to ${selectedDish} in ${selectedCategory}.`,
      )

      await loadAssignments()
    } catch (error) {
      setErrorMessage(
        `Could not assign photo: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      )
    } finally {
      setSavingAssignment(false)
    }
  }

  async function handleRemoveAssignment() {
    if (!currentAssignment) return

    const confirmed = window.confirm(
      `Remove the photo assignment for "${selectedDish}"? The image will remain in your photo library.`,
    )

    if (!confirmed) return

    setMessage('')
    setErrorMessage('')
    setSavingAssignment(true)

    try {
      const { error } = await supabase
        .from('menu_item_photos')
        .delete()
        .eq('category_name', selectedCategory)
        .eq('item_name', selectedDish)

      if (error) throw error

      setAssignments((current) =>
        current.filter(
          (assignment) =>
            !(
              assignment.category_name === selectedCategory &&
              assignment.item_name === selectedDish
            ),
        ),
      )

      setSelectedPhoto('')
      setMessage(`Photo assignment removed from ${selectedDish}.`)
    } catch (error) {
      setErrorMessage(
        `Could not remove assignment: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      )
    } finally {
      setSavingAssignment(false)
    }
  }

  async function handleDelete(photo: CafePhoto) {
    const linkedDishes = assignments.filter(
      (assignment) => assignment.storage_path === photo.name,
    )

    if (linkedDishes.length > 0) {
      setErrorMessage(
        `This photo is assigned to ${linkedDishes
          .map((item) => `${item.item_name} (${item.category_name})`)
          .join(', ')}. Remove those assignments before deleting the photo.`,
      )
      return
    }

    const confirmed = window.confirm(
      `Delete "${photo.name}"? This cannot be undone.`,
    )

    if (!confirmed) return

    setMessage('')
    setErrorMessage('')
    setDeletingPhoto(photo.name)

    try {
      const { error } = await supabase.storage
        .from(BUCKET)
        .remove([photo.name])

      if (error) throw error

      setPhotos((current) =>
        current.filter((item) => item.name !== photo.name),
      )

      if (selectedPhoto === photo.name) setSelectedPhoto('')

      setMessage('Photo deleted successfully.')
    } catch (error) {
      setErrorMessage(
        `Could not delete photo: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      )
    } finally {
      setDeletingPhoto(null)
    }
  }

  async function handleLogout() {
    setMessage('')
    setErrorMessage('')

    const { error } = await supabase.auth.signOut()

    if (error) {
      setErrorMessage(error.message)
      return
    }

    setPhotos([])
    setAssignments([])
    setMessage('You have signed out.')
  }

  if (checkingSession) {
    return (
      <main className="admin-page">
        <p className="admin-status">Checking your session...</p>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="admin-page">
        <section className="admin-card">
          <a className="admin-brand" href="/">
            LAVASH <span>CAFE</span>
          </a>

          <p className="admin-eyebrow">ADMINISTRATION</p>
          <h1>Welcome back</h1>

          <p className="admin-description">
            Sign in to manage your cafe website photos.
          </p>

          <form onSubmit={handleLogin} className="admin-form">
            <label htmlFor="admin-email">Email address</label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your admin email"
              autoComplete="username"
              required
            />

            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
              autoComplete="current-password"
              required
            />

            <button type="submit">Sign in</button>
          </form>

          {errorMessage && (
            <p className="admin-message admin-error" role="alert">
              {errorMessage}
            </p>
          )}

          {message && (
            <p className="admin-message" role="status">
              {message}
            </p>
          )}

          <a className="admin-back-link" href="/">
            ← Back to Lavash Cafe
          </a>
        </section>
      </main>
    )
  }

  return (
    <main className="admin-page admin-dashboard">
      <header className="admin-topbar">
        <a className="admin-brand" href="/">
          LAVASH <span>CAFE</span>
        </a>

        <div className="admin-account">
          <span>{user.email}</span>
          <button
            type="button"
            className="admin-secondary-button"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      </header>

      <section className="admin-main">
        <p className="admin-eyebrow">WEBSITE MANAGEMENT</p>
        <h1>Photo library</h1>

        <p className="admin-description">
          Upload photos, assign them to individual menu dishes, and manage
          your cafe website images.
        </p>

        <section className="admin-upload-panel">
          <h2>1. Upload photos</h2>
          <p>
            Add images to your library. Maximum file size: 5 MB per image.
          </p>

          <label className="admin-upload-button">
            {uploading ? 'Uploading photos...' : 'Choose photos'}
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={uploading}
              onChange={handleUpload}
            />
          </label>
        </section>

        <section className="admin-upload-panel">
          <h2>2. Assign a photo to a dish</h2>
          <p>
            Select a category and dish, then choose the matching image from
            your photo library.
          </p>

          <div className="admin-form">
            <label htmlFor="dish-category">Menu category</label>
            <select
              id="dish-category"
              value={selectedCategory}
              disabled={savingAssignment}
              onChange={(event) => {
                const category = event.target.value
                setSelectedCategory(category)
                setSelectedDish(MENU[category][0])
                setMessage('')
                setErrorMessage('')
              }}
            >
              {Object.keys(MENU).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <label htmlFor="dish-name">Dish</label>
            <select
              id="dish-name"
              value={selectedDish}
              disabled={savingAssignment}
              onChange={(event) => {
                setSelectedDish(event.target.value)
                setMessage('')
                setErrorMessage('')
              }}
            >
              {MENU[selectedCategory].map((dish) => (
                <option key={dish} value={dish}>
                  {dish}
                </option>
              ))}
            </select>

            <label htmlFor="dish-photo">Photo from your library</label>
            <select
              id="dish-photo"
              value={selectedPhoto}
              disabled={savingAssignment || photos.length === 0}
              onChange={(event) => setSelectedPhoto(event.target.value)}
            >
              <option value="">Choose a photo...</option>
              {photos.map((photo) => (
                <option key={photo.name} value={photo.name}>
                  {photo.name}
                </option>
              ))}
            </select>

            {selectedPhoto && (
              <div className="admin-assignment-preview">
                <img
                  src={
                    photos.find((photo) => photo.name === selectedPhoto)?.url
                  }
                  alt={`Preview for ${selectedDish}`}
                />
                <p>
                  Preview for <strong>{selectedDish}</strong>
                </p>
              </div>
            )}

            {currentAssignment && (
              <p className="admin-message">
                This dish already has an assigned photo. Saving a new
                selection will replace its assignment.
              </p>
            )}

            <button
              type="button"
              onClick={() => void handleAssignPhoto()}
              disabled={
                savingAssignment ||
                uploading ||
                loadingPhotos ||
                !selectedPhoto
              }
            >
              {savingAssignment
                ? 'Saving...'
                : currentAssignment
                  ? 'Replace dish photo'
                  : 'Assign photo to dish'}
            </button>

            {currentAssignment && (
              <button
                type="button"
                className="admin-secondary-button"
                onClick={() => void handleRemoveAssignment()}
                disabled={savingAssignment}
              >
                Remove dish assignment
              </button>
            )}
          </div>

          {currentAssignment && currentPhoto && (
            <p className="admin-status">
              Current photo: {currentPhoto.name}
            </p>
          )}
        </section>

        {message && (
          <p className="admin-message" role="status">
            {message}
          </p>
        )}

        {errorMessage && (
          <p className="admin-message admin-error" role="alert">
            {errorMessage}
          </p>
        )}

        <div className="admin-gallery-heading">
          <h2>
            Your photos ({photos.length})
          </h2>

          <button
            type="button"
            className="admin-secondary-button"
            onClick={() => {
              void loadPhotos()
              void loadAssignments()
            }}
            disabled={loadingPhotos || loadingAssignments || uploading}
          >
            {loadingPhotos || loadingAssignments
              ? 'Refreshing...'
              : 'Refresh'}
          </button>
        </div>

        {loadingPhotos ? (
          <p className="admin-status">Loading photos...</p>
        ) : photos.length === 0 ? (
          <div className="admin-empty-state">
            <h3>No photos uploaded yet</h3>
            <p>Choose photos above to start your library.</p>
          </div>
        ) : (
          <div className="admin-photo-grid">
            {photos.map((photo) => {
              const linkedDishes = assignments.filter(
                (assignment) => assignment.storage_path === photo.name,
              )

              return (
                <article className="admin-photo-card" key={photo.name}>
                  <a
                    href={photo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${photo.name}`}
                  >
                    <img
                      src={photo.url}
                      alt={photo.name}
                      loading="lazy"
                    />
                  </a>

                  <div className="admin-photo-info">
                    <p title={photo.name}>{photo.name}</p>

                    {photo.createdAt && (
                      <small>
                        Added{' '}
                        {new Date(photo.createdAt).toLocaleDateString()}
                      </small>
                    )}

                    {linkedDishes.length > 0 && (
                      <small>
                        Assigned to:{' '}
                        {linkedDishes
                          .map(
                            (item) =>
                              `${item.item_name} (${item.category_name})`,
                          )
                          .join(', ')}
                      </small>
                    )}

                    <button
                      type="button"
                      className="admin-delete-button"
                      onClick={() => void handleDelete(photo)}
                      disabled={
                        deletingPhoto !== null ||
                        uploading ||
                        savingAssignment
                      }
                    >
                      {deletingPhoto === photo.name
                        ? 'Deleting...'
                        : 'Delete photo'}
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        <p className="admin-status">
          {assignments.length} dish photo assignment
          {assignments.length === 1 ? '' : 's'} saved.
        </p>

        <a className="admin-back-link" href="/">
          ← View public website
        </a>
      </section>
    </main>
  )
}
