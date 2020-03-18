trait Io {
    var (input, output, input_idx) = (Array[Long](),-1L, 0)
    def get_input = {input_idx+=1; input(input_idx-1)}
    def handle_output(v : Long) = print(s":$v:")
}

class Ascii(part2: Boolean) extends Io {
  var line = if (part2)
      """OR B T
      OR E T
      OR C J
      OR C J
      AND T J
      AND A J
      NOT J J
      AND D J
      AND E T
      OR E T
      OR H T
      AND T J
      RUN
      """.stripMargin
    else
      """NOT A J
      NOT B T
      OR T J
      NOT C T
      OR T J
      AND D J
      WALK
      """.stripMargin
  override def get_input = {
    if (line.isEmpty) line = scala.io.StdIn.readLine + "\n"
    val f = line(0).toInt
    line = line.drop(1)
    f
  }
  override def handle_output(v:Long) = if (v < 256) print(v.toChar) else println(v)
}

