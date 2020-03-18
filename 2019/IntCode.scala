class IntCode(f:String) {
  import scala.collection.mutable.ArrayBuffer
  var ic= (scala.io.Source.fromFile(f).getLines.toArray).apply(0).split(",").map(_.toLong)
  val ac = Map(1->3,2->3,3->1,4->1,5->2,6->2,7->3,8->3, 9->1)
  var in : Io = new Io {}
  var cnt = 0L
  var out : Io = in
  var waitingForInput = false
  def stop = {waitingForInput = true}
  def kick = {waitingForInput = false; continue}
  var pc = 0
  var base = 0
  var track = List[String]()
  var mem: Mem = _
  var zz = scala.collection.mutable.ArrayBuffer.fill(10000)(0L)
  def this(f:String, i: Array[Long]) = {this(f); in.input=i}
  def this(f:String, i: Io) = {this(f); in = i; out = i}
  def this(f:String, i: Io, o: Io) = {this(f); in = i; out = o}
  def atype(pc:Long) = Array(pc/100 % 10, pc/1000 % 10, pc/10000 % 10)
  def run = {
    mem = Mem((ic.to[scala.collection.mutable.ArrayBuffer]++zz).toArray, this)
    pc = 0; base = 0
    mem.setBreakpoint(754)
    mem.setBreakpoint(2062)
    continue
  }
  def continue = {
    while (pc >= 0 && !waitingForInput) {
      cnt += 1L
      val i = mem(pc)
      val ii = (i % 100).toInt
      val numargs = ac.getOrElse(ii,0)
      val args = mem.slice(pc+1,pc+numargs+1)
      val atype = Array(i/100 % 10, i/1000 % 10, i/10000 % 10)
      val a = for ((arg,k) <- args.zipWithIndex) yield (atype(k), k) match {
                 case (2,_) => mem(base+arg.toInt)
                 case (m,k) if (m==1 || k ==2) => arg
                 case _ => mem(arg.toInt)
      }
      val obase = if ((ii==3 && atype(0) == 2) || atype(2) == 2) base else 0
      ii match {
        case 1 => mem(mem(pc+3).toInt+obase) = a.take(2).reduce(_+_)
        case 2 => mem(mem(pc+3).toInt+obase) = a.take(2).reduce(_*_)
        case 3 => mem(mem(pc+1).toInt+obase) = in.get_input
        case 4 => out.handle_output(a(0))
        case 5 => if (a(0) != 0) {record(pc, a(1).toInt);pc=a(1).toInt-numargs-1}
        case 6 => if (a(0) == 0) {record(pc, a(1).toInt);pc=a(1).toInt-numargs-1}
        case 7 => mem(mem(pc+3).toInt+obase) = if (a(0) < a(1)) 1 else 0
        case 8 => mem(mem(pc+3).toInt+obase) = if (a(0) == a(1)) 1 else 0
        case 9 => base += a(0).toInt
        case _ => finish;pc = -2
      }
      pc += numargs+1
    }
    out.output
  }
  def record(old: Int, n: Int) = {track = (s"$old -> $n" :: track).take(50)}
  def finish = {
      print(s"Done after $cnt instructions: PC $pc, base: $base, 754 ${mem(754)} 593 ${mem(593)} ")
      println(s"753 ${mem(753)}")
      println(track.mkString(";"))
      println(mem.slice(base,base+10))
  }
  def asm = {
    var b = Array[String](s"Size: ${ic.size}")
    var pc = 0
    while (pc < ic.size) {
      val i = ic(pc)
      val ii = (i % 100).toInt
      val numargs = ac.getOrElse(ii,0)
      val args = ic.slice(pc+1,pc+numargs+1)
      val atype = Array(i/100 % 10, i/1000 % 10, i/10000 % 10)
      val o1 = args.zip(atype).map(ff)
      val o = o1.map(x=>x._1).mkString(" ")
      val u = o1.map(x=>x._2).mkString(" ")
      b :+= (pc.toString + (ii match {
        case 1 => s" add $o   ($u)"
        case 2 => s" mul $o   ($u)"
        case 3 => s" in  $o"
        case 4 => s" out $o   ($u)"
        case 5 => s" jnz $o   ($u)"
        case 6 => s" jz $o   ($u)"
        case 7 => s" lt  $o   ($u)"
        case 8 => s" gt  $o   ($u)"
        case 9 => s" bas $o   ($u)"
        case 99 => s" END"
        case _ => s" ${ii}"
      }))
      pc += numargs+1
    }
    b
  }
  def ff(i:(Long, Long)) :(String,String) = i._2 match {
    case 0 => (" " + i._1.toString, ic(i._1.toInt).toString)
    case 1 => ("#" + i._1.toString, "")
    case 2 => ("s" + i._1.toString, "")
  }
}

