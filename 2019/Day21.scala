object Day21 {
  def apply(f:String) = {
    var pw = new java.io.PrintWriter(new java.io.File("aoc/21asm.txt"))
    pw.write(new IntCode(f, new Ascii(false)).asm.mkString("\n"))
    pw.close
    pw = new java.io.PrintWriter(new java.io.File("aoc/21asc.txt"))
    pw.write(scala.io.Source.fromFile(f).getLines.toArray
             .apply(0).split(",").map(_.toInt).zipWithIndex.map( x=>
             s"${x._2}: ${if(31 < x._1 && x._1 < 128) x._1.toChar else x._1}")
             .mkString("\n"))
    pw.close
    new IntCode(f, new Ascii(false)).run
    new IntCode(f, new Ascii(true)).run
  }
}
Day21("aoc/21.txt")

