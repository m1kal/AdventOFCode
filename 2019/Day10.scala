object Day10 {
  case class Pos(x:Int, y:Int) {
    def +(other: Dir) = Pos(x-other.x, y-other.y)
    def -(other: Pos) = Dir(x-other.x, y-other.y)
    def find = (for (o <- a if (o!=this)) yield this-o).sortBy(_.l2).toSet
  }

  case class Dir(x:Int, y:Int) extends Ordered[Dir] {
    val l2 = x*x+y*y
    override def compare(o:Dir) = angle compare o.angle
    def angle = {
      val s = 10000*x*x/l2*x.signum
      if (x <= 0 && y >= 0) -s else if (x <= 0) s+20000 else if (y < 0) s+20000 else 40000-s
    }
    override def hashCode = (1000*x*x/l2,1000*y*y/l2, x.signum, y.signum).##
    override def equals(other:Any) = other match {
        case o @ Dir(xx,yy) => x*x*o.l2 == l2*xx*xx && y*y*o.l2 == l2*yy*yy &&
                       x*xx >= 0 && y*yy>=0
    }
  }

  val i = scala.io.Source.fromFile("aoc/19_10.txt").getLines.toArray.map(_.split(""))
  val (xm, ym) = (i(0).length, i.length)
  val a = for (x <- 0 to xm-1; y <- 0 to ym-1 if i(y)(x)=="#") yield Pos(x,y)
  def apply() = {
     val sol = a.sortBy(-_.find.size).head
     (sol.find.size, sol+(sol.find.toArray.sorted).apply(199))
  }
}
Day10()

