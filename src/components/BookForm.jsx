import { useForm } from 'react-hook-form';
import { Loader2, AlertCircle } from 'lucide-react';
import { GENRES } from '@/utils/genres';
import { Input, Select } from '@/components/common/Field';
import { Button } from '@/components/common/Button';

const currentYear = new Date().getFullYear();
function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="flex items-center gap-1 text-rust text-xs mt-1.5">
      <AlertCircle className="h-3 w-3" /> {msg}
    </p>);

}

function Label({ children }) {
  return (
    <label className="block font-semibold text-sm text-text mb-1.5 tracking-wide">
      {children}
    </label>);

}

export default function BookForm({
  defaultValues = {},
  onSubmit,
  isLoading,
  submitLabel = 'Save Book'
}) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div>
        <Label>Book Title *</Label>
        <Input
          placeholder="e.g. The Great Gatsby"
          {...register('title', {
            required: 'Title is required',
            minLength: { value: 2, message: 'Title must be at least 2 characters' }
          })} />
        
        <FieldError msg={errors.title?.message} />
      </div>

      <div>
        <Label>Author *</Label>
        <Input
          placeholder="e.g. F. Scott Fitzgerald"
          {...register('author', {
            required: 'Author is required',
            minLength: { value: 2, message: 'Author must be at least 2 characters' }
          })} />
        
        <FieldError msg={errors.author?.message} />
      </div>

      <div>
        <Label>Genre *</Label>
        <Select {...register('genre', { required: 'Please select a genre' })}>
          <option value="">Select a genre…</option>
          {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
        </Select>
        <FieldError msg={errors.genre?.message} />
      </div>

      <div>
        <Label>Publication Year *</Label>
        <Input
          type="number"
          placeholder={`e.g. ${currentYear}`}
          {...register('publicationYear', {
            required: 'Publication year is required',
            min: { value: 1000, message: 'Year must be after 1000' },
            max: { value: currentYear, message: `Year can't exceed ${currentYear}` },
            valueAsNumber: true
          })} />
        
        <FieldError msg={errors.publicationYear?.message} />
      </div>

      <Button type="submit" disabled={isLoading} className="self-start mt-2 min-w-[160px]">
        {isLoading ?
        <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving…
          </> :
        submitLabel}
      </Button>
    </form>);

}