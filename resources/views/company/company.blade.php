@extends('../base')
@section('css')
	<link rel="stylesheet" href="/css/company.css" />
	<style>
		.company_c img {
			width: 100%!important;
			height: auto!important;
		}
	</style>
@endsection
@section('content')
	<section id="content">
		<div class="intreduce_text">
			<p class="red">{{$company->english}} </p>
			<p class="gray">{{$company->title}}</p>
		</div>
		<div class="company_c">
			{!! $company->content!!}
		</div>
	</section>
@endsection
