object Day14 {
  import scala.util.matching.Regex
  import scala.io.Source.fromFile
  case class Ing(name: String, amount: Long) {
    def *(other: Long) = Ing(name, amount*other)
  }
  object Ing {
    def apply(input:Array[String]):Ing = this(input(1), input(0).toLong)
  }
  case class Rec(ing: Array[Ing], res: Ing)
  object Rec {
    def apply(s: String, n: String, t: String): Rec =
      this(s.split(", ").map(_.split(" ")).map(Ing(_)), Ing(t, n.toInt))
  }
  val (init, ore) = (Ing("FUEL", 1), Rec(Array[Ing](), Ing("ORE", 1)))
  def readFile(file:String) = {
    val line = """(.*) => (\d+) (\w+)""".r
    fromFile(file).getLines.toArray.map{case line(s, n, t) => Rec(s, n, t)} :+ ore
  }
  def apply(file: String, target: Long) = step(List(init*target), readFile(file))
  def part2(file: String, target: Long) = bisect(readFile(file), target)
  def bisect(r: Array[Rec], target: Long, min: Long = 0L, max: Long = 1e10.toLong) : Long = {
    val t = (min + max) / 2
    val (min_, max_) = if (step(List(init * t), r) > target) (min, t) else (t, max)
    if (max - min < 2) t else bisect(r, target, min_, max_)
  }
  def step(queue: List[Ing], r: Array[Rec], stack: Map[String,Long] = Map(), ore_count: Long = 0L) :Long = {
    queue match {
      case Ing(name, areq) :: queue => {
        val available = stack.getOrElse(name,0L)
        if (available > 0)
            step(if (available >= areq) queue else Ing(name, areq - available) :: queue,
                 r, stack + (name -> (0L max available - areq)), ore_count)
        else {
          val Some(Rec(ii, Ing(_, aprod)))= r.find(_.res.name == name)
          val (rrem, req) = ((aprod - areq % aprod) % aprod, (areq + aprod - 1) / aprod)
          step(ii.map(_ * req).toList ::: queue, r, stack + (name -> rrem),
               if (name == "ORE") ore_count + areq else ore_count)
        }
      }
      case _ => ore_count
    }
  }
}
Day14("aoc/19_14.txt", 1)
Day14.part2("aoc/19_14.txt",1000000000000L)

