const Rating = () => {
  return (
    <div class="rating gap-1">
      <input type="radio" name="rating-3" class="mask mask-heart bg-red-400" />
      <input type="radio" name="rating-3" class="mask mask-heart bg-orange-400" checked />
      <input type="radio" name="rating-3" class="mask mask-heart bg-yellow-400" />
      <input type="radio" name="rating-3" class="mask mask-heart bg-lime-400" />
      <input type="radio" name="rating-3" class="mask mask-heart bg-green-400" />
    </div>
  )
}

export default Rating
