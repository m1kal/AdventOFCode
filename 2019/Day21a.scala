object Day21a {
  def holes(v: Int) = (for (x <- 0 to 8 if ((v & (1 << x)) == 0)) yield 18 - x).sum
  def apply(f:String) = {
    val mem= (scala.io.Source.fromFile(f).getLines.toArray)
             .apply(0).split(",").map(_.toInt)
    var (address, sum)  = (758, 0)
    def next : Unit = {
        sum += mem(address) * address * holes(mem(address))
        address += 1
        if (mem(address) != 0) next
    }
    next; println(sum); next; println(sum)
  }
}
Day21a("aoc/21.txt")

